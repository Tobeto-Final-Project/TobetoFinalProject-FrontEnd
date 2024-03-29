import { AxiosResponse } from "axios";
import axiosInstance from "../utils/axiosInterceptors";

export class BaseService<
  GetAllType,
  GetByIdType,
  AddRequestType,
  AddResponseType,
  UpdateRequestType,
  UpdateResponseType
> {
  public apiUrl: string;

  constructor() {
    this.apiUrl = "";
  }

  async getAllWithData(PageIndex: number = 0, PageSize: number = 999) {
    const response = await axiosInstance.get<any>(
      `${this.apiUrl}?PageIndex=${PageIndex}&PageSize=${PageSize}`
    );
    return response.data;
  }

  async getAll(PageIndex: number = 0, PageSize: number = 999) {
    const response = await axiosInstance.get<any>(
      `${this.apiUrl}?PageIndex=${PageIndex}&PageSize=${PageSize}`
    );
    return response.data?.items;
  }

  async getById(id: string) {
    const response = await axiosInstance.get<AxiosResponse<GetByIdType>>(
      `${this.apiUrl}/${id}`
    );
    return response.data; // Directly returning the data part of the response
  }

  async add(request: AddRequestType) {
    return axiosInstance.post<AddResponseType>(this.apiUrl, request, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  update(
    request: UpdateRequestType
  ): Promise<AxiosResponse<UpdateResponseType, any>> {
    return axiosInstance.put<UpdateResponseType>(this.apiUrl, request, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async delete(id: string | number) {
    return axiosInstance.delete(`${this.apiUrl}/${id}`);
  }

  async getByToken() {
    const response = await axiosInstance.get(`${this.apiUrl}/getByToken`);
    return response.data;
  }
}
