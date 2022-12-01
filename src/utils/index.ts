import { Network, Urls, config } from '../config';

export const AddNewMember = async (e: any, obj: any) => {
  console.log(obj);
  e.stopPropagation();
  const response = await Network.post(Urls.addMemeber, obj, (await config()).headers);
  if (!response.ok) return alert(response.data.error);
};
