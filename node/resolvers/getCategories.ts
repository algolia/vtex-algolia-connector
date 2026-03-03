

export const getCategories = async (_: unknown,__: unknown,ctx: Context) => {
    const {
      clients: { search },
    } = ctx
  
    let categories = {resources:{}, items: []}
    try {
  
      categories = await search.categories().then((res: any) => {
        return {
          resources: res.headers.resources,
          items: res.data,
        }
      })
    
    } catch (e) {
      console.log('error in the get ', e)
    }
  
    return categories
  }