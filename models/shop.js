module.exports = (sequelize, DataTypes) => {
  const Shop = sequelize.define('Shop', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'shops',
    timestamps: false,
  })

  return Shop
}
