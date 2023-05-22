import {ClientMediaDto} from "./product/model/client-media.dto";
import {pipeline, Readable} from "stream";
import fs from "fs";
import sharp from "sharp";

export class MediaService {

  public createMedia(file) : Promise<ClientMediaDto> {
    return Promise.all([
      this.createFileVariant(file, {variant: MediaVariantEnum.Large, maxDimension: 1024} ),
      this.createFileVariant(file, {variant: MediaVariantEnum.LargeSquare, maxDimension: 1024} ),
      this.createFileVariant(file, {variant: MediaVariantEnum.Medium, maxDimension: 600} ),
      this.createFileVariant(file, {variant: MediaVariantEnum.Small, maxDimension: 300} )
    ]).then(() => {
      console.log("media done", file.media)
      return file.media
    });
  }

  private createFileVariant(file, resizeOption: ResizeOption)  : Promise<ClientMediaDto> {
    const fileReadStream: Readable = fs.createReadStream(file.path);

    const resizeStream = sharp().resize(MediaService.getResizeConfig(resizeOption)).jpeg({progressive: true, quality: 80});

    const baseFileName = file.path.replace(".jpeg", "").replace(".jpg", "");
    const pathToFile = `${baseFileName}_${resizeOption.variant}.jpeg`;
    const fileWriteStream = fs.createWriteStream(pathToFile);

    return new Promise<ClientMediaDto>((resolve, reject) => {
      pipeline(fileReadStream, resizeStream, fileWriteStream, err => {
        if (err) {
          console.log("err1", err);
          reject("Failed to create file variant");
          return;
        }

        file.media.variantsUrls[resizeOption.variant] = `http://127.0.0.1:3003/${pathToFile}`;

        console.log("resizeOption done ", resizeOption)
        resolve(file.media);
      });
    });
  }

  private static getResizeConfig(resizeOption: ResizeOption) {
    const sharpResizeOptions: sharp.ResizeOptions = {
      width: resizeOption.maxDimension,
      height: resizeOption.maxDimension
    };
    if (MediaVariantEnum.LargeSquare === resizeOption.variant) {
      sharpResizeOptions.fit = 'contain';
      sharpResizeOptions.background = '#fff';
    } else {
      sharpResizeOptions.fit = 'inside';
    }
    return sharpResizeOptions;
  }
}

export enum MediaVariantEnum {
  Large = 'large',
  LargeSquare = 'large_square',
  Medium = 'medium',
  Small = 'small'
}

class ResizeOption {
  variant: MediaVariantEnum;
  maxDimension: number | null;
}


