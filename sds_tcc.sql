-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 29/04/2025 às 21:25
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `sds_tcc`
--

CREATE DATABASE IF NOT EXISTS `sds_tcc`;
USE `sds_tcc`;

-- --------------------------------------------------------

--
-- Estrutura para tabela `agendamento`
--


CREATE TABLE `agendamento` (
  `id_ag` int(11) NOT NULL,
  `em_ag` varchar(4) DEFAULT NULL,
  `data_ag` datetime DEFAULT NULL,
  `desc_ag` varchar(300) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `midia`
--

CREATE TABLE `midia` (
  `id_md` int(11) NOT NULL,
  `tipo_md` varchar(30) DEFAULT NULL,
  `midia_md` varchar(80) DEFAULT NULL,
  `ano_md` year(4) DEFAULT NULL,
  `evento_md` varchar(30) DEFAULT NULL,
  `em_md` varchar(4) DEFAULT NULL,
  `id_req` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `noticias`
--

CREATE TABLE `noticias` (
  `id_not` int(11) NOT NULL,
  `data_not` date DEFAULT NULL,
  `midia_not` varchar(80) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `requisicao`
--

CREATE TABLE `requisicao` (
  `id_req` int(11) NOT NULL,
  `tipo_req` varchar(30) DEFAULT NULL,
  `midia_req` varchar(80) DEFAULT NULL,
  `ano_req` year(4) DEFAULT NULL,
  `evento_req` varchar(30) DEFAULT NULL,
  `em_req` varchar(4) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id_user` int(11) NOT NULL,
  `em_user` varchar(4) DEFAULT NULL,
  `nome_user` varchar(200) DEFAULT NULL,
  `login_user` varchar(200) DEFAULT NULL,
  `senha_user` varchar(200) DEFAULT NULL,
  `foto_user` varchar(80) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id_user`, `em_user`, `nome_user`, `login_user`, `senha_user`, `foto_user`) VALUES
(1, 'EM0', 'Coordenação Pedagógica', 'coordpedagogica', '123', ''),
(2, 'EM1', 'Comissão EM1', 'em1comissao', '123', ''),
(3, 'EM2', 'Comissão EM2', 'em2comissao', '123', ''),
(4, 'EM3', 'Comissão EM3', 'em3comissao', '123', ''),
(5, 'EM4', 'Comissão EM4', 'em4comissao', '123', ''),
(6, 'EM5', 'Comissão EM5', 'em5comissao', '123', ''),
(7, 'EM6', 'Comissão EM6', 'em6comissao', '123', ''),
(8, 'EM7', 'Comissão EM7', 'em7comissao', '123', ''),
(9, 'EM8', 'Comissão EM8', 'em8comissao', '123', ''),
(10, 'EM9', 'Comissão EM9', 'em9comissao', '123', ''),
(11, 'EM10', 'Comissão EM10', 'em10comissao', '123', ''),
(12, 'EM11', 'Comissão EM11', 'em11comissao', '123', '');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `agendamento`
--
ALTER TABLE `agendamento`
  ADD PRIMARY KEY (`id_ag`),
  ADD KEY `id_user` (`id_user`);

--
-- Índices de tabela `midia`
--
ALTER TABLE `midia`
  ADD PRIMARY KEY (`id_md`),
  ADD KEY `id_req` (`id_req`);

--
-- Índices de tabela `noticias`
--
ALTER TABLE `noticias`
  ADD PRIMARY KEY (`id_not`),
  ADD KEY `id_user` (`id_user`);

--
-- Índices de tabela `requisicao`
--
ALTER TABLE `requisicao`
  ADD PRIMARY KEY (`id_req`),
  ADD KEY `id_user` (`id_user`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `agendamento`
--
ALTER TABLE `agendamento`
  MODIFY `id_ag` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `midia`
--
ALTER TABLE `midia`
  MODIFY `id_md` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `noticias`
--
ALTER TABLE `noticias`
  MODIFY `id_not` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `requisicao`
--
ALTER TABLE `requisicao`
  MODIFY `id_req` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `agendamento`
--
ALTER TABLE `agendamento`
  ADD CONSTRAINT `agendamento_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id_user`);

--
-- Restrições para tabelas `midia`
--
ALTER TABLE `midia`
  ADD CONSTRAINT `midia_ibfk_1` FOREIGN KEY (`id_req`) REFERENCES `requisicao` (`id_req`);

--
-- Restrições para tabelas `noticias`
--
ALTER TABLE `noticias`
  ADD CONSTRAINT `noticias_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id_user`);

--
-- Restrições para tabelas `requisicao`
--
ALTER TABLE `requisicao`
  ADD CONSTRAINT `requisicao_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
