import '!style-loader!css-loader!sass-loader!../src/scss/main.scss';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color|backgroundColor)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      method: "alphabetical",
      order: [
        "Introduction",
        ["Actions", "Structure", "Forms", "Image and icons", "Feedback indicators", "Titles and text", "Behaviour", "List & Tables", "Navigation", "Overlays"],
      ]
    }
  },
}
