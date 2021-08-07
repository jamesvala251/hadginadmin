export interface IProfilePicture {
  id?: string;
  userId?: string;
  pictureName?: string;
  pictureImageContentType?: string;
  pictureImage?: any;
}

export class ProfilePicture implements IProfilePicture {
  constructor(
    public id?: string,
    public userId?: string,
    public pictureName?: string,
    public pictureImageContentType?: string,
    public pictureImage?: any
  ) {}
}
