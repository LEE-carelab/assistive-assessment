(() => {
  const ascii = s => {
    const b = new Uint8Array(s.length);
    for (let i=0;i<s.length;i++) b[i] = s.charCodeAt(i) & 255;
    return b;
  };
  const concat = parts => {
    const total = parts.reduce((n,p)=>n+p.length,0), out = new Uint8Array(total);
    let at=0; for(const p of parts){out.set(p,at);at+=p.length;} return out;
  };
  const dataUrlBytes = url => {
    const raw = atob(url.split(',')[1]), out = new Uint8Array(raw.length);
    for(let i=0;i<raw.length;i++) out[i]=raw.charCodeAt(i); return out;
  };
  async function canvasToJpeg(canvas, quality=.9){
    const url=canvas.toDataURL('image/jpeg',quality);
    return {bytes:dataUrlBytes(url),width:canvas.width,height:canvas.height};
  }
  function buildJpegPdf(images){
    if(!images.length) throw new Error('沒有可輸出的頁面');
    const count=2+images.length*3, offsets=new Array(count+1).fill(0), parts=[];
    let length=0;
    const push=b=>{parts.push(b);length+=b.length};
    const pushS=s=>push(ascii(s));
    push(new Uint8Array([37,80,68,70,45,49,46,52,10,37,226,227,207,211,10]));
    const kids=images.map((_,i)=>`${3+i*3} 0 R`).join(' ');
    const objects={
      1:[ascii('<< /Type /Catalog /Pages 2 0 R >>')],
      2:[ascii(`<< /Type /Pages /Count ${images.length} /Kids [${kids}] >>`)]
    };
    images.forEach((img,i)=>{
      const page=3+i*3, image=page+1, content=page+2;
      const stream=ascii(`q\n595.28 0 0 841.89 0 0 cm\n/Im${i+1} Do\nQ\n`);
      objects[page]=[ascii(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /XObject << /Im${i+1} ${image} 0 R >> >> /Contents ${content} 0 R >>`)];
      objects[image]=[ascii(`<< /Type /XObject /Subtype /Image /Width ${img.width} /Height ${img.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${img.bytes.length} >>\nstream\n`),img.bytes,ascii('\nendstream')];
      objects[content]=[ascii(`<< /Length ${stream.length} >>\nstream\n`),stream,ascii('endstream')];
    });
    for(let n=1;n<=count;n++){
      offsets[n]=length; pushS(`${n} 0 obj\n`); for(const p of objects[n]) push(p); pushS('\nendobj\n');
    }
    const xrefAt=length; pushS(`xref\n0 ${count+1}\n0000000000 65535 f \n`);
    for(let n=1;n<=count;n++) pushS(`${String(offsets[n]).padStart(10,'0')} 00000 n \n`);
    pushS(`trailer\n<< /Size ${count+1} /Root 1 0 R >>\nstartxref\n${xrefAt}\n%%EOF\n`);
    return new Blob([concat(parts)],{type:'application/pdf'});
  }
  window.RasterPDF={canvasToJpeg,buildJpegPdf};
})();
