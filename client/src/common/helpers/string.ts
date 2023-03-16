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

export const converStringToFileWithUrl = (
  image: string | null,
): FileWithUrl | null => {
  if (image) {
    const imageFile = new File([], '') as FileWithUrl;
    imageFile.url = image;

    return imageFile;
  }

  return null;
};

export const removeHTMLTags = (str: string) => {
  return str.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, "");
}