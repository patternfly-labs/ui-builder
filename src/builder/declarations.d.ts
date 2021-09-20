// png|jpg|svg in webpack.config.js
declare module "\*.png" {
  const content: string;
  export default content;
}

declare module "\*.jpg" {
  const content: string;
  export default content;
}

declare module "\*.svg" {
  const content: string;
  export default content;
}
