import api from "../../config/client.axios.api";
import { TCreateRecordTransaction } from "../../type/TCreateRecord";

export const postCreateRecordTransaction = async (
  createRecordInfo?: TCreateRecordTransaction
) => {
  const response = await api.post(
    `/admin/record-transaction`,
    createRecordInfo
  );
  return response;
};
