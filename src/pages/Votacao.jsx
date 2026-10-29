import { useState } from 'react';
import { Link } from 'react-router-dom';
import ParticipanteCard from '../components/ParticipanteCard';
import {
  listarNaRoca,
  listarForaDaRoca,
  registrarVoto,
} from '../services/votacaoService';

function Votacao() {
  const [ultimoVoto, setUltimoVoto] = useState(null);
  const [votosNaSessao, setVotosNaSessao] = useState(0);

  const naRoca = listarNaRoca();
  const foraDaRoca = listarForaDaRoca();

  function handleVotar(participante) {
    registrarVoto(participante.id);
    setUltimoVoto(participante);
    setVotosNaSessao(votosNaSessao + 1);
  }

  return (
    <main className="pagina">
      <h1>Quem você quer eliminar?</h1>
      <p>Cada clique conta um voto para tirar o peão da fazenda.</p>

      {ultimoVoto !== null && (
        <div className="mensagem">
          <span>
            Voto registrado para eliminar <strong>{ultimoVoto.nome}</strong>.
            Você já votou {votosNaSessao} {votosNaSessao === 1 ? 'vez' : 'vezes'}.
          </span>
          <Link to="/resultado">Ver resultado</Link>
        </div>
      )}

      <div className="grade-roca">
        {naRoca.map((p) => (
          <ParticipanteCard key={p.id} participante={p} onVotar={handleVotar} />
        ))}
      </div>

      <h2>Demais peões</h2>
      <p>Fora da roça nesta semana, não podem receber votos.</p>

      <div className="grade-demais">
        {foraDaRoca.map((p) => (
          <ParticipanteCard key={p.id} participante={p} />
        ))}
      </div>
    </main>
  );
}

export default Votacao;
