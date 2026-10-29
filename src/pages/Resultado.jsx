import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  obterVotos,
  calcularTotalVotos,
  calcularResultado,
  zerarVotos,
} from '../services/votacaoService';

function Resultado() {
  const [votos, setVotos] = useState(() => obterVotos());

  const total = calcularTotalVotos(votos);
  const resultado = calcularResultado(votos);

  function handleZerar() {
    if (window.confirm('Tem certeza que deseja zerar a votação?')) {
      zerarVotos();
      setVotos({});
    }
  }

  return (
    <main className="pagina">
      <h1>Parcial da eliminação</h1>
      <p>
        <strong className="total">{total}</strong> votos computados
      </p>

      {total === 0 ? (
        <div className="mensagem-vazia">
          <p>Ainda não há votos. Que tal ser o primeiro?</p>
          <Link to="/votacao">Ir para a votação</Link>
        </div>
      ) : (
        <div>
          {resultado.map((p, i) => (
            <div key={p.id} className={i === 0 ? 'placar placar-lider' : 'placar'}>
              <img src={p.foto} alt={p.nome} />
              <div className="placar-info">
                <h3>
                  {p.nome}
                  {i === 0 && <span className="selo-saira">Sairia hoje</span>}
                </h3>
                <div className="barra">
                  <div
                    className="barra-preenchida"
                    style={{ width: `${p.percentual}%` }}
                  ></div>
                </div>
                <p>
                  {p.percentual.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%
                  ({p.votos} votos)
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <button className="botao-zerar" onClick={handleZerar}>
        Zerar votação
      </button>
    </main>
  );
}

export default Resultado;
