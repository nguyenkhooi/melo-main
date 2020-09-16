import * as React from "react";
// import { LISTEN_NOTES_KEY } from "dotenv";

export function usePodcast(query: string) {
  const [result, setResult] = React.useState();
  React.useEffect(function inputQuery() {}, []);

  const getPodcastResult = async () => {
    try {
      let response = await fetch(
        "https://listen-api.listennotes.com/api/v2/search?q=star%20wars&sort_by_date=0&type=episode&offset=0&len_min=10&len_max=30&genre_ids=68%2C82&published_before=1580172454000&published_after=0&only_in=title%2Cdescription&language=English&safe_mode=0",
        {
          method: "GET",
          headers: {
            "X-ListenAPI-Key": "d7f9fea7ad1c47499a5130cf3ae447d4",
          },
        }
      );
      let json = await response.json();
      console.log("result: ", JSON.stringify(json));
      return json;
    } catch (error) {
      console.warn(error);
    }
  };
}
