const fetchMeals = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(url);
  const { meals } = await response.json();
  return meals;
};

export default fetchMeals;

export const fetchDrinks = async () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(url);
  const { drinks } = await response.json();
  return drinks;
};

export const fetchCategoryMeals = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(url);
  const { meals } = await response.json();
  return meals;
};

export const fetchCategoryDrinks = async () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(url);
  const { drinks } = await response.json();
  return drinks;
};

export const fetchFilterByCategory = async (group, category) => {
  if (group === 'meals') {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    const response = await fetch(url);
    const { meals } = await response.json();
    return ['meals', meals];
  }
  if (group === 'drinks') {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    const response = await fetch(url);
    const { drinks } = await response.json();
    return ['drinks', drinks];
  }
};
