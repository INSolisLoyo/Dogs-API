const cleaner = (arr) => {
    return arr.map( (obj) => {
      return {
        id: obj.id,
        image: obj.image.url,
        name: obj.name,
        height: obj.height.metric,
        weight: obj.weight.metric,
        life_span: obj.life_span,
        temperament: obj.temperament
      }
    })
};

module.exports = cleaner;