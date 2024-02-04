//!мидлеваре нужен для приватных роутов, синтаксис следующий, мы переэкспортируем готовый мидлеваре
export { default } from 'next-auth/middleware'

//matcher - набор роутов которые должны быть приватными, next-auth уже сам понимает, в зависимости от авторизации
export const config = { matcher: ['/test', '/test2', '/protected/:path*'] }
