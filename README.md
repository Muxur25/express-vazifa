GET - /books => books.json faylini o’qib oling va barcha ma’lumotlarni chiqaring

GET - /books/:id => books.json faylidan :id bo’yicha qidiring, agar topilsa ma’lumotni qaytaring, aks xolda ma’lumot topilmadi degan xabarni qaytaring

POST - /books => books.json fayliga yangi ma’lumotni qo’shing

ma’lumotlarni qo’shishda title va author kiritilsin.

id => auto generate qilinsin

Agar kitoblar ro’yxatida kiritilayotgan title bo’yicha boshqa kitob mavjud bo’lsa, bu kitob bazada mavjud degan degan xabar qaytarilsin

PUT - /books/:id => books.json faylidan :id bo’yicha qidiring, agar topilsa ma’lumotni kiritilgan ma’lumotlar bo’yicha tahrirlang, topilmasa ma’lumot topilmadi xabarini qaytaring

DELETE - /books/:id => books.json faylidan :id bo’yicha qidiring, agar topilsa ma’lumotni o’chirib tashlang, aks xolda ma’lumot topilmadi degan xabarni qaytaring.
