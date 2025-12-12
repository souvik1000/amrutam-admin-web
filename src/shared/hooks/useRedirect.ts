import { useMemo } from 'react';
import queryString from 'query-string';
import { generatePath, useLocation, useNavigate } from 'react-router-dom';

import { AppRoutes, NavigationRoutes } from 'src/routes/routeConstants/appRoutes';

const useRedirect = () => {
  const navigate = useNavigate();
  const { pathname, hash, search } = useLocation();

  const searchQuery = useMemo(
    () => queryString.parse(search, { arrayFormat: "bracket" }),
    [search]
  );

  const navigateToHome = () => navigate(AppRoutes.HOME);

  const dynamicNavigate = (path: string) => navigate(path);

  const replaceLocationInfo = (hashValue?: string, params?: object, exact = false) => {
    const updatedParams = exact ? params || {} : { ...searchQuery, ...params };

    navigate(
      {
        pathname,
        hash: hashValue ?? hash,
        search: queryString.stringify(updatedParams, { arrayFormat: "bracket" })
      },
      { replace: true }
    );
  };


  const navigateToIngredientDetails = (name: string, ingredientData?: any) => {
    const pathname = generatePath(NavigationRoutes.INGREDIENT_DETAILS, { name })
    navigate(pathname, { state: { ingredientData } })
  }

  const navigateToAddIngredient = (hash?: string) => {
    navigate({pathname: NavigationRoutes.ADD_INGREDIENTS, hash})
  }

  // const navigateToFormWithHash = (sectionHash?: string) => {
  //   navigate(NavigationRoutes.ADD_INGREDIENTS, {
  //     state: { scrollToHash: sectionHash }
  //   })
  // }

  return {
    searchQuery,
    hash: hash.replace("#", ""),
    navigateToHome,
    dynamicNavigate,
    replaceLocationInfo,
    navigateToAddIngredient,
    // navigateToFormWithHash,
    navigateToIngredientDetails
  };
};

export default useRedirect;
