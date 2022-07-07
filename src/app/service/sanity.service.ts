import { Injectable } from "@angular/core";
import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { Actor } from "../model/sactor";
import { Movie } from "../model/smovie";

@Injectable({
  providedIn: "root",
})
export class SanityService {
  constructor() {}
  sanityClientCredentials = {
    option: sanityClient({
      projectId: "c5romzyo",
      dataset: "production",
    }),
  };

  urlFor = (source: any) =>
    imageUrlBuilder(this.sanityClientCredentials.option).image(source);

  async getMovies(): Promise<Movie[]> {
    return await this.sanityClientCredentials.option.fetch(
      `*[_type == "movie"]{
      _id,
  title,
  overview,
  releaseDate,
  poster
}`
    );
  }

  async getActors(): Promise<Actor[]> {
    return await this.sanityClientCredentials.option.fetch(
      `*[_type == "person"]{
      _id,
  name,
  image
}`
    );
  }
}
