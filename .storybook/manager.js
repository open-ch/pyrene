import { addons } from '@storybook/addons';
import { STORY_RENDERED } from '@storybook/core-events'
import kitchensinkTheme from './KitchensinkTheme';

addons.setConfig({
  theme: kitchensinkTheme,
});

// Change page title to Pyrene
addons.register('TitleAddon', api => {
  const customTitle = 'Pyrene';
  let interval = null;
  const setTitle = () => {
    clearTimeout(interval);

    let storyData = null;
    try {
        storyData = api.getCurrentStoryData();
    } catch(e) {
      console.error(e);
    }

    const title = !storyData ? customTitle : `${storyData.kind} - ${storyData.name} ⋅ ${customTitle}`;

    if (document.title !== title) {
        document.title = title;
    }
    interval = setTimeout(setTitle, 100);
  };
  setTitle();
  api.on(STORY_RENDERED, setTitle);
});

addons.setConfig({
  enableShortcuts: false,
});
