# Cadastro de carro

**RF**
Deve ser possível cadastrar um novo carro
Deve ser possivel listar todas as categorias

**RN**
Não deve ser possível cadastrar um carro com uma placa ja existente
Não deve ser possível alterar a placa de um carro já cadastrado
O carro deve ser cadastrado, por padrão, com disponibilidade
O usuário responsável pelo cadastro deve ser um usuário administrador

# Listagem de carros

**RF**
Deve ser possível listar todos os carros disponíveis
Deve ser possível listar todos os carros disponíveis pelo nome da categoria, marca e nome

**RN**
O usuário não precisa estar logado no sistema

# Cadastro de especificação no carro

**RF**
Deve ser possível cadastrar uma especificação para um carro
Deve ser possível listar todas as especificações
Deve ser possível listar todos os carros

**RN**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro
O usuário responsável pelo cadastro deve ser um usuário administrador

# Cadastro de imagem do carro

**RF**
Deve ser possível cadastrar a imagem do carro
Deve ser possivel listar todas os carros

**RNF**
Utilizar o multer para upload dos arquivos

**RN**
O usuário deve poder cadastrar mais de uma imagem para um carro
O usuário responsável pelo cadastro deve ser um usuário administrador

# Cadastro de imagem do carro

**RF**
Deve ser possivel cadastrar um aluguel.

**RNF**
Utilizar o multer para upload dos arquivos

**RN**
O aluguel deve ter no mínimo 24 horas de duração
Não deve ser possível cadastar um novo aluguel caso já existe um aberto para o mesmo usuário
Não deve ser possível cadastar um novo aluguel caso já existe um aberto para o mesmo carro