(function () {
  const unsplash = (id) => `https://images.unsplash.com/photo-${id}?w=1200&q=75&auto=format&fit=crop`;

  // Unbranded beauty photos from Unsplash; option 1 is the photo currently on the site
  const options = [
    { id: '1741896135512-084b251887f7', note: 'รูปปัจจุบัน — ขวดเซรั่มบนพื้นชมพู', current: true },
    { id: '1608571423902-eed4a5ad8108', note: 'ขวดดรอปเปอร์สีอำพันบนแท่น เงาใบปาล์ม — ดูพรีเมียม' },
    { id: '1785581778868-79100f7fe56c', note: 'ครีมและเซรั่มบนหินอ่อน ใบยูคาลิปตัส — สะอาด หรูหรา' },
    { id: '1631730486572-226d1f595b68', note: 'ขวดโทนพีช-ทองแดง flat lay บนพื้นชมพู — ทันสมัย' },
    { id: '1596462502278-27bfdc403348', note: 'แปรงแต่งหน้าและลิปสติกสีชมพู flat lay — เมคอัป' },
    { id: '1555820585-c5ae44394b79', note: 'ภาพผู้หญิงหลับตา แสงอบอุ่น — สื่ออารมณ์ผิวสวย' },
    { id: '1619451427882-6aaaded0cc61', note: 'มือกดโลชั่นจากขวดปั๊ม — ดูเป็นการใช้งานจริง' },
    { id: '1552046122-03184de85e08', note: 'มือหยิบกระปุกครีม เซรั่ม และแผ่นมาส์ก' },
    { id: '1761864293811-d6e937225df4', note: 'วัตถุดิบและอุปกรณ์ความงามบนพื้นส้ม — สีสันสดใส' },
    { id: '1585945037805-5fd82c2e60b1', note: 'เนื้อครีมสีขาวบนพื้นเบจ — มินิมอล' },
  ];

  document.querySelector('[data-options]').innerHTML = options.map((o, i) => `
    <section class="pk-item">
      <div class="pk-label"><b>${i + 1}</b>${o.current ? '<span class="pk-current">ใช้อยู่ตอนนี้</span>' : ''}<span>${o.note}</span></div>
      <div class="pk-frame">
        <article class="case-card case-1">
          <img src="${unsplash(o.id)}" alt="" loading="lazy" decoding="async">
          <span class="case-cat">E-Commerce</span>
          <div class="case-body">
            <h3 class="case-name">แบรนด์ความงาม</h3>
            <div class="case-stats">
              <div><span class="case-value">+320%</span><span class="case-label">ยอดขายเพิ่มขึ้น</span></div>
              <div><span class="case-value">-42%</span><span class="case-label">ต้นทุนต่อผลลัพธ์</span></div>
            </div>
          </div>
        </article>
      </div>
      <code class="pk-id">${o.id}</code>
    </section>`).join('');
})();
