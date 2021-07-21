import React from 'react';
import PropTypes from 'prop-types';

class TableRanking extends React.Component {
  render() {
    const { ranking } = this.props;
    return (
      <table className="ranking-table">
        <thead className="ranking-thead">
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Pontos</th>
          </tr>
        </thead>
        <tbody className="ranking-tbody">
          {ranking.sort((a, b) => a.score - b.score).reverse()
            .map((player, index) => (
              <tr className={ index % 2 === 0 ? 'indexPair' : 'indexOdd' } key={ index }>
                <td>{ index + 1}</td>
                <td className="td-flex">
                  <img
                    data-testid={ `player-picture-${index}` }
                    src={ player.picture }
                    alt="Imagem do avatar"
                  />
                  <p data-testid={ `player-name-${index}` }>{player.name}</p>
                </td>
                <td data-testid={ `player-score-${index}` }>{player.score}</td>
              </tr>))}

        </tbody>
      </table>
    );
  }
}

TableRanking.propTypes = {
  ranking: PropTypes.arrayOf(Object).isRequired,
};

export default TableRanking;
