mkdir frontend
mkdir backend
move .gitignore frontend\
move README.md frontend\
move eslint.config.js frontend\
move index.html frontend\
move package-lock.json frontend\
move package.json frontend\
move postcss.config.js frontend\
move tailwind.config.js frontend\
move vite.config.js frontend\
move src frontend\
move public frontend\
cd backend
npm init -y
npm install express mongoose cors dotenv
npm install nodemon --save-dev
mkdir models routes controllers config
