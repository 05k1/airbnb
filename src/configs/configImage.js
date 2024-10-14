export function getPublicIdFromUrl(url) {
  // Bước 1: Tách URL để lấy phần cuối cùng (public_id với định dạng file)
  const parts = url.split("/");

  // Bước 2: Lấy phần public_id từ các phần của URL
  const filenameWithExtension = parts.pop(); // Lấy phần cuối cùng (bmekvnjnxisaer3ks42l.webp)

  // Bước 3: Loại bỏ phần đuôi định dạng (webp, jpg, png, ...)
  const public_id = filenameWithExtension.split(".").slice(0, -1).join("."); // Chỉ lấy tên mà không có đuôi

  // Bước 4: Ghép với folder (airbnb trong trường hợp này)
  const folderPath = parts.slice(-1).join("/"); // Lấy phần cuối cùng (folder), chỉ lấy một thư mục

  // Bước 5: Kết hợp folder với public_id
  return `${folderPath}/${public_id}`; // Trả về: 'airbnb/bmekvnjnxisaer3ks42l'
}
