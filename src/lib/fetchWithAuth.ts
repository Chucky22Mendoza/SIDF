import { ResponseWrapper } from "@/domain/Response";

interface FetchOptions extends RequestInit {
  headers?: HeadersInit
}

const getAuthToken = (): string | null => {
  return localStorage.getItem('sidfToken');
};

export const setAuthToken = (token: string | undefined): void => {
  if (token) {
    localStorage.setItem('sidfToken', token);
    return;
  }

  localStorage.removeItem('sidfToken');
};

export const fetchWithAuth = async <T>(url: string, options: FetchOptions = {}): Promise<ResponseWrapper<T>> => {
  const token = getAuthToken();

  let updateOptions = {...options}
  updateOptions.method = updateOptions.method ?? 'GET';

  const headers = {
    ...updateOptions.headers,
    Authorization: token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json',
  };

  const newOptions = {
    ...updateOptions,
    headers,
  };

  try {
    const response = await fetch(url, newOptions);
    if (response.ok && response.status === 200) {
      const { message, data } = await response.json();
      return Promise.resolve({
        message,
        success: true,
        data: data as T,
      });
    }

    const { message } = await response.json();
    return Promise.resolve({
      message,
      success: false,
      data: undefined,
    });
  } catch (error: any) {
    console.log(error);

    return Promise.resolve({
      message: 'Internal Server Error',
      success: false,
      data: undefined,
    });
  }
};
