import * as Config from '../../config';

import AsyncStorage from '@react-native-community/async-storage';
import mime from 'mime';

export const uploadImageAsync = async (
  uri: string,
  dir:string,
  fileNamePrefix?: string,
): Promise<Response> => {
  const fileName = uri.split('/').pop();
  const fileType = mime.getType(uri) as string;
  const data: FormData = new FormData();
  const token = await AsyncStorage.getItem('token');

  data.append('inputFile', {
    uri: uri,
    type: fileType ?? 'image/png',
    name: `${fileName}${fileNamePrefix}`,
  });

  data.append('dir', dir);

  const fetchOption: RequestInit = {
    method: 'POST',
    body: data,
    headers: new Headers({
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    }),
  };

  try {
    const res: Response = await fetch(`${Config.ROOT_URL}/upload_single`, fetchOption);

    return res;
  } catch (err) {
    throw new Error(err);
  }
};
