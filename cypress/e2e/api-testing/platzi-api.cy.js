describe('API Automation - Platzi Fake Store API', () => {
  const baseUrl = 'https://api.escuelajs.co/api/v1'

  it('TC001 - Mendapatkan seluruh kategori', () => {
    cy.request(`${baseUrl}/categories`).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an('array')
      expect(response.body.length).to.be.greaterThan(0)
      expect(response.body[0]).to.have.property('id')
      expect(response.body[0]).to.have.property('name')
    })
  })

  it('TC002 - Mendapatkan kategori berdasarkan ID 1', () => {
    cy.request(`${baseUrl}/categories/1`).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an('object')
      expect(response.body).to.have.property('id', 1)
      expect(response.body).to.have.property('name')
    })
  })

  it('TC003 - Mendapatkan kategori berdasarkan ID 2', () => {
    cy.request(`${baseUrl}/categories/2`).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an('object')
      expect(response.body).to.have.property('id', 2)
      expect(response.body).to.have.property('slug')
    })
  })

  it('TC004 - Mendapatkan produk dari kategori ID 1', () => {
    cy.request(`${baseUrl}/categories/1/products`).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an('array')

      if (response.body.length > 0) {
        expect(response.body[0]).to.have.property('id')
        expect(response.body[0]).to.have.property('title')
        expect(response.body[0].category.id).to.eq(1)
      }
    })
  })

  it('TC005 - Mendapatkan produk dari kategori ID 2', () => {
    cy.request(`${baseUrl}/categories/2/products`).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an('array')

      response.body.forEach((product) => {
        expect(product).to.have.property('title')
        expect(product).to.have.property('price')
        expect(product.category.id).to.eq(2)
      })
    })
  })

  it('TC006 - Mendapatkan seluruh produk', () => {
    cy.request(`${baseUrl}/products`).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an('array')
      expect(response.body.length).to.be.greaterThan(0)
      expect(response.body[0]).to.have.property('title')
      expect(response.body[0]).to.have.property('price')
    })
  })

  it('TC007 - Mendapatkan lima produk pertama', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/products`,
      qs: {
        offset: 0,
        limit: 5,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an('array')
      expect(response.body.length).to.eq(5)
    })
  })

  it('TC008 - Mendapatkan lima produk berikutnya', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/products`,
      qs: {
        offset: 5,
        limit: 5,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an('array')
      expect(response.body.length).to.eq(5)

      response.body.forEach((product) => {
        expect(product.id).to.be.a('number')
        expect(product.title).to.be.a('string')
      })
    })
  })

  it('TC009 - Mendapatkan produk berdasarkan ID yang tersedia', () => {
  cy.request(`${baseUrl}/products?offset=0&limit=1`).then((listResponse) => {
    expect(listResponse.status).to.eq(200)
    expect(listResponse.body).to.be.an('array').and.not.be.empty

    const productId = listResponse.body[0].id

    cy.request(`${baseUrl}/products/${productId}`).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an('object')
      expect(response.body).to.have.property('id', productId)
      expect(response.body).to.have.property('title')
      expect(response.body).to.have.property('price')
    })
  })
})

it('TC010 - Mendapatkan produk terkait berdasarkan ID yang tersedia', () => {
  cy.request(`${baseUrl}/products?offset=0&limit=1`).then((listResponse) => {
    expect(listResponse.status).to.eq(200)
    expect(listResponse.body).to.be.an('array').and.not.be.empty

    const productId = listResponse.body[0].id

    cy.request(`${baseUrl}/products/${productId}/related`).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an('array')

      response.body.forEach((product) => {
        expect(product).to.have.property('id')
        expect(product).to.have.property('title')
        expect(product).to.have.property('category')
      })
    })
  })
})

  it('TC011 - Memfilter produk berdasarkan kategori ID 1', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/products`,
      qs: {
        categoryId: 1,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an('array')

      response.body.forEach((product) => {
        expect(product.category.id).to.eq(1)
      })
    })
  })

  it('TC012 - Memfilter produk berdasarkan rentang harga', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/products`,
      qs: {
        price_min: 1,
        price_max: 100,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an('array')

      response.body.forEach((product) => {
        expect(product.price).to.be.at.least(1)
        expect(product.price).to.be.at.most(100)
      })
    })
  })
})
