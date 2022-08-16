const yeniGörev = document.querySelector('.input-görev');
const yeniGörevEkleBtn = document.querySelector('.btn-görev-ekle');
const görevListesi = document.querySelector('.görev-listesi');

yeniGörevEkleBtn.addEventListener('click', görevEkle);
görevListesi.addEventListener('click', görevSilTamamla);
document.addEventListener('DOMcontentLoaded', localStorageOku);

function görevSilTamamla(e) {
    const tıklanılanEleman = e.target;

    if (tıklanılanEleman.classList.contains('görev-btn-tamamlandı')) {

        tıklanılanEleman.parentElement.classList.toggle('görev-tamamlandı');
    }
    if (tıklanılanEleman.classList.contains('görev-btn-sil')) {

        if (confirm('Silmek istediğinizden emin misiniz?')){
            tıklanılanEleman.parentElement.classList.toggle('kaybol');
            const silinecekGörev = tıklanılanEleman.parentElement.children[0].innerText;
    
            localStorageSil(silinecekGörev);
    
            tıklanılanEleman.parentElement.addEventListener('transitionend', function () {
                tıklanılanEleman.parentElement.remove();
            });
        }

        tıklanılanEleman.parentElement.classList.toggle('kaybol');
        const silinecekGörev = tıklanılanEleman.parentElement.children[0].innerText;

        localStorageSil(silinecekGörev)

        tıklanılanEleman.parentElement.addEventListener('transitionend', function () {
            tıklanılanEleman.parentElement.remove();
        });

    }
}


function görevEkle(e) {
    e.preventDefault();

    if (yeniGörev.value.length > 0) {
        görevİtemOluştur(yeniGörev.value);

        //localStorage kaydet 
        localStorageKaydet(yeniGörev.value);
        yeniGörev.value = '';
    } else {
        alert('Not girmediniz.');
    }

}
function localStorageArrayeDönüştür() {
    let görevler;

    if (localStorage.getItem('görevler') === null) {
        görevler = [];
    } else {
        görevler = JSON.parse(localStorage.getItem('görevler'));

    }
    return görevler;
}
function localStorageKaydet(yeniGörev) {
    let görevler = localStorageArrayeDönüştür();
    görevler.push(yeniGörev);
    localStorage.setItem('görevler', JSON.stringify(görevler));
}

function localStorageOku() {
    let görevler = localStorageArrayeDönüştür();

    görevler.forEach(function (görev) {
        görevİtemOluştur(görev);

    });

}

function görevİtemOluştur(görev) {


    //div oluşturma
    const görevDiv = document.createElement('div');
    görevDiv.classList.add('görev-item');

    //li oluşturma

    const görevLi = document.createElement('li');
    görevLi.classList.add('görev-item');
    görevLi.innerText = görev;
    görevDiv.appendChild(görevLi);

    //tamamlandı butonu ekle

    const görevTamamBtn = document.createElement('button');
    görevTamamBtn.classList.add('görev-btn');
    görevTamamBtn.classList.add('görev-btn-tamamlandı');
    görevTamamBtn.innerHTML = '<i class="far fa-check-square"></i>';
    görevDiv.appendChild(görevTamamBtn);

    //görev sil butonu
    const görevSilBtn = document.createElement('button');
    görevSilBtn.classList.add('görev-btn');
    görevSilBtn.classList.add('görev-btn-sil');
    görevSilBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
    görevDiv.appendChild(görevSilBtn);


    //localStorage kaydet 
    localStorageKaydet(yeniGörev.value);
    yeniGörev.value = '';


    // ul'ye oluşdurduğumuz div 
    görevListesi.appendChild(görevDiv);

}

function localStorageSil(görev) {
    let görevler = localStorageArrayeDönüştür();
    // splice ile item sil

    const silinecekElemanİndex = görevler.indexOf(görev);
    console.log(silinecekElemanİndex);
    görevler.splice(silinecekElemanİndex, 1);

    localStorage.setItem('görevler', JSON.stringify(görevler));

}