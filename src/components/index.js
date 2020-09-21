//@ts-check
export * from "./StyledComponents";
export { default as Icon } from "./Icon";
export { PROPS_Icon } from "./Icon";

export { default as OptionsModal } from "./Modals/OptionsModal";

export * from "./ScreenLayout/ScreenHeader";
export * from "./Modals/$$_Player";

export { default as Toasty } from "./Generals/Toasty/Toasty";

export * from "./Externals";

/**
const getPodcastResult = async () => {
    try {
      let response = await fetch(
        'https://listen-api.listennotes.com/api/v2/search?q=star%20wars&sort_by_date=0&type=episode&offset=0&len_min=10&len_max=30&genre_ids=68%2C82&published_before=1580172454000&published_after=0&only_in=title%2Cdescription&language=English&safe_mode=0',
        {
          method: 'GET',
          headers: {
            'X-ListenAPI-Key': 'd7f9fea7ad1c47499a5130cf3ae447d4',
          },
        }
      );
      let json = await response.json();
      console.log('result: ', JSON.stringify(json));
      return json;
    } catch (error) {
      console.error(error);
    }
  };
 */
