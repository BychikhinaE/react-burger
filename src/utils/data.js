
    // {
    //  "_id":"60666c42cc7b410027a1a9b1",
    //  "name":"Краторная булка N-200i",
    //  "type":"bun",
    //  "proteins":80,
    //  "fat":24,
    //  "carbohydrates":53,
    //  "calories":420,
    //  "price":20,
    //  "image":"https://code.s3.yandex.net/react/code/bun-02.png",
    //  "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    //  "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
    //  "__v":1
    // }
  //Запрашиваем ингредиенты на сервере и передаем их в стейт
  // React.useEffect(() => {
  //   getData()
  //     .then((data) => {
  //       setState({ data: data.data, isLoading: false, hasError: false });
  //     })
  //     .catch((error) => {
  //       console.log("Произошла ошибка: ", error);
  //       setState({ ...state, isLoading: false, hasError: true });
  //     });
  // }, []);

  // const content = useMemo(
  //   () => {
  //     return itemsRequest ? (
  //       <Loader size="large" />
  //     ) : (
  //       items.map((item, index) => {
  //         return <Product key={index} {...item} />;
  //       })
  //     );
  //   },
  //   [itemsRequest, items]
  // );
