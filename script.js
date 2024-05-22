var modal = document.getElementById("myModal");
var rateBtn = document.querySelector(".avaliar-button");
var span = document.querySelector(".close");

rateBtn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

document.getElementById("reviewForm").addEventListener("submit", function(event){
  event.preventDefault();
  // Aqui você pode adicionar o código para lidar com a submissão da avaliação
});

var stars = document.querySelectorAll('.star');
var rating = 0;

stars.forEach(function(star) {
    star.addEventListener('click', function() {
        var value = parseFloat(star.getAttribute('data-value'));
        rating = value;
        stars.forEach(function(s) {
            if (parseFloat(s.getAttribute('data-value')) <= value) {
                s.classList.add('selected');
            } else {
                s.classList.remove('selected');
            }
        });
    });
});

document.getElementById("reviewForm").addEventListener("submit", function(event){
    event.preventDefault();
    console.log(`Enviando avaliação: ${rating} estrelas`);
});

document.getElementById("reviewForm").addEventListener("submit", function(event){
    event.preventDefault();

    // Obtenha as informações do jogo do formulário
    var gameName = document.getElementById('gameName').value;
    var review = document.getElementById('review').value;

    // Crie uma nova div para o jogo
    var gameDiv = document.createElement('div');
    gameDiv.className = 'game-card';

    gameDiv.innerHTML = `
        <h2 style="color: white;">${gameName}</h2>
        <p style="font-family: TiemposTextWeb-Regular, Georgia, serif; font-size: 15px; line-height: 24px; text-align: left; letter-spacing: normal;">${displayStars(rating)}</p>
        <p>${review}</p>
        <hr style="color: #ebedef";>
    `;

    // Adicione a nova div ao DOM
    document.body.appendChild(gameDiv);

    // Limpe o formulário
    document.getElementById('gameName').value = '';
    document.getElementById('review').value = '';
    stars.forEach(function(star) {
        star.classList.remove('selected');
    });
    rating = 0;
});

function displayStars(rating) {
    var stars = '';
    for (var i = 1; i <= 5; i++) {
        if (rating >= i) {
            stars += '<span class="star-green">★</span>';
        } else if (rating >= i - 0.5) {
            stars += '<span class="star-half">☆</span>';
        } else {
            stars += '<span class="star-display">☆</span>';
        }
    }
    return stars;
}











