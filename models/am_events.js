module.exports = (sequelize, DataTypes) => {
  const Events = sequelize.define("Events", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    // assignee: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    //   validate: {
    //     len: [1]
    //   }
    // },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    start_time: {
      type: DataTypes.STRING,
      allowNull: true
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // end_date: {
    //   type: DataTypes.DATEONLY,
    //   allowNull: true
    // },
    repeat_cycle: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // reminder: {
    //   type: DataTypes.STRING,
    //   allowNull: true
    // },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });

  return Events;
};
