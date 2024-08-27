export const MESSAGE_STATUS = {
  SENT: "Sent",
  NOT_SENT: "Not Sent",
};

export const GUEST_RESPONSE = {
  ATTENDING: "Attending",
  NOT_ATTENDING: "Not Attending",
  NO_RESPONSE: "No Response",
};

export const GUEST_TYPE = {
  AQIELA: "Aqiela",
  SYED: "Syed",
};

export const AQIELA_MESSAGE = (encodedKey: string, numberOfGuest: number) => {
  const additional =
    numberOfGuest === 2
      ? " dan pasangan "
      : numberOfGuest >= 3
        ? " dan keluarga "
        : " ";
  return `
بِسۡـــــــــمِ ٱللهِ ٱلرَّحۡـمَـٰنِ ٱلرَّحِـــــــيمِ
Dengan penuh kesyukuran, kami *Ismathinoon bin Haji Abdul Rahman & Nur Athiyah Binti Abdullah* dengan rendah hati menjemput Dato' Seri/ Datin Seri/ Dato’/ Datin/ Tuan/ Puan/ Encik/ Cik${additional}ke Majlis Pertunangan puteri kami

*Aqiela Munirah & Syed Ismail*

🗓️ 15 September 2024 (Ahad)
⏳ 7 p.m - 10.00 pm
🏢 The Hall @ KL Gateway Mall, Jalan Kerinchi.

📱 Hubungi:
*Ismathinoon*  - 0126690105
*Amirul* - 01137853588

RSVP:
Untuk memudahkan urusan persiapan, kami amat menghargai sekiranya anda dapat mengesahkan kehadiran anda selewat-lewatnya pada *1st September 2024* di https://aqielasyed.azushi.com/${encodedKey}/.

📍 *Navigation link to The Hall @ KL Gateway Mall*:
* Waze Link : https://aqielasyed.azushi.com/waze/
* Google Maps : https://aqielasyed.azushi.com/maps/

Semoga dengan kehadiran tetamu semua dapat membawa bersama rahmat dan barakah ke dalam majlis kami
`;
};

export const SYED_MESSAGE = (encodedKey: string) => `
JEMPUTAN MAJLIS PERTUNANGAN 

‎بِسْــــــــــــــــــمِ اﷲِالرَّحْمَنِ الرَّحِيم

‎السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُه
   
Dengan penuh rasa syukur, kami sekeluarga ingin menjemput anda ke Majlis Pertunangan anak kami,
*MUHAMMAD SYED ISMAIL*
dengan pilihan hatinya,
*AQIELA MUNIRAH*

Dengan ini sangat berbesar hati menjemput Dato'/Datin/Tuan/Puan/Encik/Cik untuk hadir ke majlis pertunangan putera kami
di butiran berikut:

📆 *Ahad, 15 SEPTEMBER 2024*
🍛 *7.00pm - 10:00pm*

RSVP:
Untuk memudahkan urusan persiapan, kami amat menghargai sekiranya anda dapat mengesahkan kehadiran anda selewat-lewatnya pada *1st September 2024* di https://aqielasyed.azushi.com/${encodedKey}/.

🏡 *THE HALL, KL GATEWAY MALL (UG.02, LEVEL 2)*
* Waze Link : https://aqielasyed.azushi.com/waze/
* Google Maps : https://aqielasyed.azushi.com/maps/

Kehadiran dan doa restu anda amatlah kami hargai untuk sama-sama memeriahkan majlis ini.

𝑨𝒎𝒊𝒊𝒏 𝒀𝒂 𝑹𝒂𝒃𝒃𝒂𝒍 𝑨'𝒍𝒂𝒎𝒊𝒏

Sekian, Terima kasih.
`;
