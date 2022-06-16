import { alterarImagem, alterarProduto, consultarProdutos, consultarProdutosID, consultarProdutosNome, deletarProduto, exibirProdutosCategoria, exibirProdutosUsuario, inserirProduto } from '../repository/produtoRepository.js'
import multer from 'multer';
import { Router } from 'express'


const server = Router();
const upload = multer({ dest : 'storage/capasProduto' })

server.post('/produto', async (req, resp) => {
    try{
        const produto = req.body
		if(!produto.nome.trim())
			throw new Error('Nome do produto é obrigatorio!')
		if(!produto.categoria)
			throw new Error('Categoria do produto é obrigatorio!')
		if(!produto.descricao.trim())
			throw new Error('Descrição do produto é obrigatorio!')
		if(!produto.preco)
			throw new Error('Preço do produto é obrigatorio!')
		if(!produto.telefone.trim())
			throw new Error('Telefone é obrigatorio!')
		if(!produto.email.trim())
			throw new Error('E-mail é obrigatorio!')
		if(!produto.cep.trim())
			throw new Error('Cep é obrigatorio!')

		const produtoinserido = await inserirProduto(produto);
        resp.send(produtoinserido)

    } catch(err){
        resp.status(400).send({
            erro:err.message
        })
    }
})

server.put('/produto/:id/capa', upload.single('capa'), async (req,resp) => {
    try{
		if(!req.file) throw new Error('Escolha a capa do produto!')
        const { id } = req.params;
        const imagem = req.file.path;
		
        const resposta = await alterarImagem(imagem, id)
        if(resposta != 1) 
			throw new Error('A imagem não pode ser salva.')
        resp.status(204).send();
    } catch(err){
		console.log(err)
        resp.status(400).send({
            erro: err.message
        })
    }
})
server.put('/produto/:id', async (req,resp) => {
	try{
		const { id } = req.params;
		const produto = req.body
		const resposta = await alterarProduto(id,produto);
		if(!produto.usuario.trim())
			throw new Error('Usuario é obrigatorio!')
		if(!produto.nome.trim())
			throw new Error('Nome do produto é obrigatorio!')
		if(!produto.categoria)
			throw new Error('Categoria do produto é obrigatorio!')
		if(!produto.descricao.trim())
			throw new Error('Descrição do produto é obrigatorio!')
		if(!produto.preco)
			throw new Error('Preço do produto é obrigatorio!')
		if(!produto.telefone.trim())
			throw new Error('Telefone é obrigatorio!')
		if(!produto.email.trim())
			throw new Error('E-mail é obrigatorio!')
		if(!produto.cep.trim() )
			throw new Error('Cep é obrigatorio!')
		if (resposta != 1) 
			throw new Error('produto nao pode ser alterado') 
		else 
			resp.status(204).send()
	} catch(err){
        resp.status(400).send({
            erro: err.message
        })}
	})
server.get('/produto', async (req,resp) => {
	try{
		const resposta = await consultarProdutos();
		resp.send(resposta);
	} catch(err){
        resp.status(400).send({
            erro: err.message
        })
	}
})
server.delete('/produto/:id', async (req,resp) => {
	try{
		const { id } = req.params;
		const deletar = await deletarProduto(id)
		if(deletar != 1) throw new Error('produto não pode ser removido')
		else
		resp.status(204).send()
	} catch(err){
        resp.status(400).send({
            erro: err.message
        })
	}
})
server.get('/produto/busca', async (req,resp) => {
	try{
		const { nome, categoria } = req.query;
		
		const resposta = await consultarProdutosNome(nome, categoria);

		// if(resposta.length == 0) 
		// 	throw new Error('produto não encontrado')
		// else
			resp.send(resposta);

	} catch(err){
        resp.status(400).send({
            erro: err.message
        })
	}
})
server.get('/produto/:id', async (req,resp) => {
	try{
		const {id} = req.params;
		const resposta = await consultarProdutosID(id);
		if(!resposta) throw new Error('produto não encotrado')
		else
		resp.status(200).send(resposta);
	} catch(err){
        resp.status(400).send({
            erro: err.message
        })
	}
})
server.get('/produto/usuario/:id', async (req,resp) => {
	try{
		const {id} = req.params;
		const resposta = await exibirProdutosUsuario(id);
		if(!resposta) throw new Error('produto não encotrado')
		else
		resp.status(200).send(resposta);
	} catch(err){
        resp.status(400).send({
            erro: err.message
        })
	}
})
server.get('/produto/categoria/:id', async (req,resp) => {
	try{
		const {id} = req.params;
		const resposta = await exibirProdutosCategoria(id);
		if(!resposta) throw new Error('produto não encotrado')
		else
		resp.status(200).send(resposta);
	} catch(err){
        resp.status(400).send({
            erro: err.message
        })
	}
})

export default server