<template>
    <div class="social">
      <ul>
        <li>
          <a
            href="https://chat.whatsapp.com/JdYNVnZ9R7a8JX4aIw6cmm"
            target="_blank"
            rel="noopener noreferrer"
          >
            Whatsapp <i class="fa fa-whatsapp"></i>
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/invistribe"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram <i class="fa fa-instagram"></i>
          </a>
        </li>
        <!-- <li>
          <a
            href="https://youtube.com/SEU_CANAL"
            target="_blank"
            rel="noopener noreferrer"
          >
            Youtube <i class="fa fa-youtube"></i>
          </a>
        </li> -->
        <li>
          <a
            href="https://x.com/invtcoin"
            target="_blank"
            rel="noopener noreferrer"
          >
            X/Twitter <i class="fa fa-twitter"></i>
          </a>
        </li>
      </ul>
    </div>
</template>

<script>
import 'font-awesome/css/font-awesome.min.css';

export default {
  name: "SocialBar",
};
</script>

<style scoped>
/* Barra fixa à esquerda */
.social {
  position: fixed;
  top: 100px;
}

.social ul {
  padding: 0px;
  transform: translate(-270px, 0);
}

.social ul li {
  display: block;
  margin: 5px;
  background: #f1f5f9; /* Azul claro padrão do sistema */
  width: 300px;
  text-align: right;
  padding: 5px;
  border-radius: 0 30px 30px 0;
  transition: all 1s;
}

.social ul li:hover {
  transform: translate(110px, 0);
  background: #126AEF; /* Azul escuro padrão do sistema */
}

.social ul li:hover a {
  color: #ffffff; /* Texto branco no hover */
}

.social ul li:hover i {
  color: #126AEF; /* Azul escuro no ícone no hover */
  background: #ffffff; /* Fundo branco no hover */
  transform: rotate(360deg);
  transition: all 1s;
}

.social ul li i {
  color: #ffffff; /* Ícone branco padrão */
  background: #126AEF; /* Fundo azul escuro padrão */
  padding: 4px;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  font-size: 18px;
  transform: rotate(0deg);
}

body {
  background: #e6f2f7; /* Fundo azul claro harmonizado */
  color: #333;
  font-family: 'Raleway', sans-serif;
}
</style>
