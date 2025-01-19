export const readFileAsDataURL = (file: File): Promise<string> => {
   return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target?.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
   });
};

export const loadImage = (src: string): Promise<HTMLImageElement> => {
   return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = (error) => reject(error);
      img.src = src;
   });
};

export function generateUniqueRandomCode(prefix: string, length: number): string {
   const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
   let result = "";
   for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
   }
   return `${prefix}${result}`;
}
