$(document).ready(function() {
   // All your jQuery code goes here
   const animes = [
    {
      title: "Attack on Titan",
      genre: "Action, Drama, Fantasy",
      poster: "https://wallpapers.com/images/hd/attack-on-titan-mikasa-cover-image-ybt96t1e1041qdt3.jpg",
      summary: "Humans fight for survival against man-eating titans outside city walls.",
      review: "Intense action and deep storytelling. A must-watch for anime fans."
    },
    {
      title: "Demon Slayer",
      genre: "Action, Supernatural",
      poster: "https://i.pinimg.com/736x/95/28/b3/9528b32a6db1f2b0ffc0124aadae7fd7.jpg",
      summary: "Tanjiro becomes a demon slayer to avenge his family and cure his sister.",
      review: "Stunning animation and emotional depth. A visual masterpiece."
    },
    {
      title: "Jujutsu Kaisen",
      genre: "Action, Fantasy, Supernatural",
      poster: "https://pbs.twimg.com/media/EId6xgiXkAAqkaY.jpg:large",
      summary: "A high schooler joins a secret organization to fight cursed spirits.",
      review: "Fast-paced battles and likable characters. Highly engaging."
    },
    {
      title: "Your Name",
      genre: "Romance, Supernatural, Drama",
      poster: "https://m.media-amazon.com/images/I/61XYaC9gYXS._AC_UF894,1000_QL80_.jpg",
      summary: "Two teenagers mysteriously swap bodies and form a deep connection.",
      review: "Heartfelt and visually breathtaking. A beautiful story of fate and love."
    }
  ];

  animes.forEach(anime => {
    const card = `
    <div class="review-card">
      <img src="${anime.poster}" alt="${anime.title}">
      <h3>${anime.title}</h3>
      <div class="genre">${anime.genre}</div>
      <div class="summary">${anime.summary}</div>
      <div class="review">${anime.review}</div>
    </div>
  `;
    $('#review-list').append(card);
  });
    
});