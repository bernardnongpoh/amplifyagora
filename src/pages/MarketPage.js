import React from 'react'
import { Link } from 'react-router-dom'
import { Loading, Tabs, Icon } from 'element-react'
import Error from '../components/Error'
import useFetchMarketData from '../components/helpers/useFetchMarketData'
import NewProduct from '../components/NewProduct'
import Product from '../components/Product'

const MarketPage = ({ marketId, user }) => {
  const { market, isMarketOwner, isLoading, isError } = useFetchMarketData({
    marketId,
    user,
  })

  return isLoading && !isError ? (
    <Loading fullscreen={true} />
  ) : (
    <>
      {/* Back button*/}
      <Link className="link" to="/">
        Back to Markets List
      </Link>

      {/* Market MetaData */}
      <span className="items-center pt-2">
        <h2 className="mb-mr">{market.name}</h2> - {market.owner}
      </span>
      <div className="items-center pt-2">
        <span style={{ color: 'var(--lightSquidInk)', paddingBottom: '1em' }}>
          <Icon name="date" className="icon" />
          {market.createdAt}
        </span>
      </div>

      {/* New Product */}
      <Tabs type="border-card" value={isMarketOwner ? '1' : '2'}>
        {isMarketOwner && (
          <Tabs.Pane
            label={
              <>
                <Icon name="plus" className="icon" />
                Add Product
              </>
            }
            name="1"
          >
            <NewProduct />
          </Tabs.Pane>
        )}

        {/* Products List */}
        <Tabs.Pane
          label={
            <>
              <Icon name="menu" className="icon" />
              Products ({market.products.items.length})
            </>
          }
          name="2"
        >
          {/* <div className="product list"> */}
          {/*   {market.products.items.map(product => ( */}
          {/*     <Product product={product} /> */}
          {/*   ))} */}
          {/* </div> */}
        </Tabs.Pane>
      </Tabs>
    </>
  )
}

export default MarketPage
