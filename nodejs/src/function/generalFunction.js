import path from "path";

export function toVietnameseSlug(str) {
    return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9._-]/g, '')
    .toLowerCase();                           // viết thường
  }

  export function xuLyTenFile(tiengVietTenFile) {
    const ext = path.extname(tiengVietTenFile);
    const name = path.basename(tiengVietTenFile, ext);
  
    const tenXuLy = name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '_')
      .replace(/[^a-zA-Z0-9._-]/g, '')
      .toLowerCase();
  
    return `${tenXuLy}${ext}`;
  }
  