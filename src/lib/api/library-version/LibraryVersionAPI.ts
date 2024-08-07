import { saveAs } from 'file-saver';

import { client } from '@/lib/api/instance';
import { getAuthorizationHeader } from '@/lib/api/utils';
import {
  LibraryVersion,
  LibraryVersionWithDetails,
} from '@/types/libraryVersion';

class LibraryVersionAPI {
  async create(formData: FormData) {
    const { data } = await client.post(
      '/libraryVersions',
      formData,
      getAuthorizationHeader(),
    );
    return data;
  }

  async download(libraryVersionId: number, format: string) {
    try {
      const response = await client.get(
        `/libraryVersions/download/${libraryVersionId}`,
        {
          headers: {
            format,
          },
          responseType: 'blob',
        },
      );

      const filename = response.headers['content-disposition']
        .split('filename=')[1]
        .split(';')[0]
        .trim();

      saveAs(response.data, filename);
    } catch (error) {
      console.error('Download failed', error);
    }
  }

  async getByLibraryId(id: number) {
    let { data } = await client.get<LibraryVersion[]>(
      `/libraryVersions/by-library/${id}`,
    );

    // @ts-expect-error: The $values property does not exist on type 'unknown'.
    data = data.$values;
    return data;
  }

  async getById(id: number) {
    const { data } = await client.get<LibraryVersionWithDetails>(
      `/libraryVersions/${id}`,
    );

    data.libraryVersionSupportedFrameworks =
      // @ts-expect-error: The $values property does not exist on type 'unknown'.
      data.libraryVersionSupportedFrameworks.$values;
    // @ts-expect-error: The $values property does not exist on type 'unknown'.
    data.libraryVersionDependencies = data.libraryVersionDependencies.$values;
    return data;
  }
}

export default new LibraryVersionAPI();
