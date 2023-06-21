import { Injectable } from "@angular/core";
import {
  DefaultHttpUrlGenerator,
  HttpResourceUrls,
  Pluralizer,
} from "@ngrx/data";
@Injectable()
export class CustomurlHttpGenerator extends DefaultHttpUrlGenerator {
  constructor(pluralizer: Pluralizer) {
    super(pluralizer);
  }

  protected override getResourceUrls(
    entityName: string,
    root: string,
    trailingSlashEndpoints?: boolean
  ): HttpResourceUrls {
    let resourceURLs = this.knownHttpResourceUrls[entityName];
    if (entityName === "Product") {
      resourceURLs = {
        collectionResourceUrl: "http://localhost:3000/products/",
        entityResourceUrl: "http://localhost:3000/products/",
      };
      this.registerHttpResourceUrls({ [entityName]: resourceURLs });
    }
    return resourceURLs;
  }
}
