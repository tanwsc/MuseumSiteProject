# mini curates

A website that generates bite-sized selections of artworks from Harvard Art Museum.

## Description

This project aims to provide an ease of mind when navigating through a museum website. Users have the option of choosing a selection from a recommended list of categories, or to look for something more specific through searching up a keyword of a title.

Each set generates up to 5 pieces of art, and users can look through as many or as little sets as they wish.

### Tech Used

```
- React
- Material UI
```

### Wireframes

#### Recommended Categories

![choices](https://git.generalassemb.ly/charlenetan/project2-MuseumSite/blob/master/picures/choices.png?raw=true)

- Draft of page where user picks out a category
- Will be redirected to a page with a set of art to look through

#### Main Art Viewer

![main](https://git.generalassemb.ly/charlenetan/project2-MuseumSite/blob/master/picures/main.png?raw=true)

- Page where user views their set of art
- Details to the left and image should take most space on the page
- Arrows to scroll through different art in the given set
- Menu options to navigate to other pages
- Button to generate new set of the same category

### User Stories

- The user can see
  - Recommended categories to choose from
  - A selection of art based on their selected preference
  - Details of each individual art
- The user can scroll through the different art selected for them
- The user can get a new set of art for the same category
- The user can choose a different category of art
- The user has the option to search for art by a title keyword

---

## Planning and Development Process

- Started with main art display component (fetching data and rendering it)
- Added pages to populate the site
- Began to link options to manipulate the url and fetch different sets of data
- Passed in the art component into the pages where it needs to render it out
- s t y l i n g

### Problem-Solving Strategy

#### Why are there only these few categories to choose from?

After looking through the API data, I concluded that these were the categories that had the most interesting artworks, and also the most number of objects. To improve your viewing experience, I needed a sizeable number of objects to work with. Thus, those were the _recommended_ categories.

#### Not all objects have all the information I want! How do I prevent them from showing?

Ternary operators were used to prevent empty containers from rendering on the page.

#### Some data objects don't have images!

Likewise, there is a filtering function that 'discards' objects without an image source. The render _should_ only return objects that have an image for your viewing.

#### What if I want something else?

The search page allows users to type in a keyword that searches based off the title of the art.

### Unsolved problems

- Search function -- not just by title keyword
- Theme creation
- Image zoom -- Replaced with modal as placeholder but layout is not ideal
- Overall layout and UI of website
- Refactoring the code

## APIs Used

[Harvard Art Museum API](https://harvardartmuseums.org/collections/api)

- Their API is quite expansive in terms of the details of each art object
- Images come along with their API
  - although some are locked behind permissions

---

## Acknowledgments

[Harvard Art Museum](https://harvardartmuseums.org/)

[Material UI](https://material-ui.com/)

---

## References

[Harvard Art Museum API Toolkit and Guide](https://api-toolkit.herokuapp.com/)

[Net Ninja Material UI Tutorials](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gjxLvV4VEkZ6H6H4yWuS58)
