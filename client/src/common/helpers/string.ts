import { FileWithUrl } from "common/types";

export const getFirstLetter = (text: string): string => {
  return text.length > 0 ? text[0] : '';
};

export const getInitials = (name: string, surname: string): string => {
  return `${getFirstLetter(name)}${getFirstLetter(surname)}`.toLocaleUpperCase();
};

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const convertStringToFileWithUrl = (image: string) => {
  const BASE64_MARKER = ';base64,';

  if(!image.includes(BASE64_MARKER)) {
    const file = new File([], '') as FileWithUrl;
    file.url = image;
  
    return file;
  };

  const parts = image.split(BASE64_MARKER);
  const contentType = parts[0].split(':')[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(rawLength);

  for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
  }

  const blob = new Blob([uInt8Array], { type: contentType });
  const file = new File([blob], '') as FileWithUrl;
  file.url = image;

  return file;
}

export const removeHTMLTags = (str: string) => {
  return str.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, "");
}