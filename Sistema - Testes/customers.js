let indexEditando = null;

// Ao abrir a página, lê o índice pendente (ou null)
window.addEventListener('DOMContentLoaded', () => {
  const stored = localStorage.getItem('indexEditando');  //estava index no lugar de stored
    if (stored !== null) {                               //estava index no lugar de stored
      indexEditando = Number(stored);
      localStorage.removeItem('indexEditando');
      preencherFormulario(indexEditando);
    }
  const btnSalvar = document.querySelector('.botao-salvar');
    if (btnSalvar) {
        btnSalvar.addEventListener('click', salvarCliente);
    }  
});

// Preenche o form com dados de um cliente existente
function preencherFormulario(index) {
  const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
  const cliente = clientes[index];
  if (!cliente) return;

  document.getElementById('nomeCliente').value        = cliente.nome;
  document.getElementById('cepCliente').value         = cliente.cep;
  document.getElementById('enderecoCliente').value    = cliente.endereco;
  document.getElementById('numCliente').value         = cliente.numero;
  document.getElementById('bairroCliente').value      = cliente.bairro;
  document.getElementById('cidadeCliente').value      = cliente.cidade;
  document.getElementById('estadoCliente').value      = cliente.estado;
  document.getElementById('complementoCliente').value = cliente.complemento;
  document.getElementById('telefoneCliente').value    = cliente.telefone;
  document.getElementById('celularCliente').value     = cliente.celular;
  
  const cpfEl = document.getElementById('cpfCliente');
    if (cpfEl) {
      cpfEl.value = cliente.documento || '';
  }

  const cnpjEl = document.getElementById('cnpjCliente');
    if (cnpjEl) {
      cnpjEl.value = cliente.documento || '';
    }
}

// Limpa visual de erros
function clearFieldErrors() {
  document.querySelectorAll('.field').forEach(field => {
    field.classList.remove('has-error');
    const span = field.querySelector('.error-message');
      if (span) span.style.display = 'none';
    });
}

// Validação retorna { campo: mensagem, ... }
function validarFormularioCliente(cliente) {
  const errors = {};
    if (!cliente.nome.trim())                 errors.nome      = "Nome é obrigatório.";
    if (!/^\d{8}$/.test(cliente.cep))          errors.cep       = "CEP inválido. Deve conter 8 dígitos.";
    if (cliente.numero && isNaN(cliente.numero)) errors.numero   = "Número deve conter apenas dígitos.";
    if (cliente.telefone && !/^\d{8,15}$/.test(cliente.telefone))
                                                errors.telefone = "Telefone inválido. 8–15 dígitos.";
    if (cliente.documento && !/^(\d{11}|\d{14})$/.test(cliente.documento))
                                                errors.documento = "Documento deve ter 11 ou 14 dígitos.";
  return errors;
}

// Salvar ou editar cliente
function salvarCliente() {
  const cpf  = document.getElementById('cpfCliente')?.value.trim();
  const cnpj = document.getElementById('cnpjCliente')?.value.trim();
  const documento = cpf || cnpj || "";

  const novoCliente = {
    nome:        document.getElementById('nomeCliente').value.trim(),
    cep:         document.getElementById('cepCliente').value.trim(),
    endereco:    document.getElementById('enderecoCliente').value.trim(),
    numero:      document.getElementById('numCliente').value.trim(),
    bairro:      document.getElementById('bairroCliente').value.trim(),
    cidade:      document.getElementById('cidadeCliente').value.trim(),
    complemento: document.getElementById('complementoCliente').value.trim(),
    telefone:    document.getElementById('telefoneCliente').value.trim(),
    celular:     document.getElementById('celularCliente').value.trim(),
    documento:   documento
  };

  clearFieldErrors();
  const fieldErrors = validarFormularioCliente(novoCliente);
    if (Object.keys(fieldErrors).length > 0) {
      for (let [campo, msg] of Object.entries(fieldErrors)) {
        const fieldDiv = document.getElementById(`field-${campo}`);
        const span     = fieldDiv.querySelector('.error-message');
        fieldDiv.classList.add('has-error');
        span.textContent = msg;
        span.style.display = 'block';
        //setTimeout(() => span.style.display = 'none', 3000);
      }
    return;
  }

let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
  if (indexEditando !== null) {
    clientes[indexEditando] = novoCliente;
    indexEditando = null;
      } else {
        clientes.push(novoCliente);
      }
  localStorage.setItem('clientes', JSON.stringify(clientes));

  const msg = document.getElementById('mensagemSucesso');
    msg.textContent = 'Salvo!';
    msg.style.display = 'block';
    //setTimeout(() => msg.style.display = 'none', 3000);

  limparFormulario();
  clearFieldErrors();
}

// function mostrarErrosDeTeste() {
//   const campos = ['nome', 'cep', 'endereco', 'numero', 'bairro', 'telefone', 'cnpj'];

//   campos.forEach(campo => {
//     const fieldDiv = document.getElementById(`field-${campo}`);
//     if (fieldDiv) {
//       const span = fieldDiv.querySelector('.error-message');
//       fieldDiv.classList.add('has-error');
//       span.textContent = `Erro simulado no campo "${campo}"`;
//       span.style.display = 'block';
//     }
//   });
// }

//para o menu cabeçalho
document.addEventListener('DOMContentLoaded', () => {
  const menuCheckbox = document.getElementById('menu');            
  const menuContainer = document.querySelector('.container__menu'); 

 
  menuContainer.addEventListener('mouseleave', () => {
    menuCheckbox.checked = false;
  });
});


// espera a página carregar
document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.tab;              // ex: "aba-enderecos"
      const targetContent = document.getElementById(targetId);

      // remove active de todos
      tabButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      // adiciona active no botão clicado e no conteúdo correspondente
      btn.classList.add('active');
      targetContent.classList.add('active');
    });
  });
});

//muda pessoa fisica/juridica
document.addEventListener('DOMContentLoaded', () => {
  const fisicaRadio    = document.getElementById('pessoaFisica');
  const juridicaRadio  = document.getElementById('pessoaJuridica');
  const camposFisica   = document.getElementById('campos-fisica');
  const camposJuridica = document.getElementById('campos-juridica');

  function togglePessoa() {
    if (fisicaRadio.checked) {
      camposFisica.style.display   = 'grid';
      camposJuridica.style.display = 'none';
    } else {
      camposFisica.style.display   = 'none';
      camposJuridica.style.display = 'grid';
    }
  }

  // dispara ao mudar o radio
  fisicaRadio.addEventListener('change', togglePessoa);
  juridicaRadio.addEventListener('change', togglePessoa);
  // inicializa o estado
  togglePessoa();
});

//ABAS
document.addEventListener("DOMContentLoaded", () => {

  const tabs = document.querySelectorAll(".tab-btn");
  const panes = document.querySelectorAll(".tab-content");

  tabs.forEach(tab => {
    tab.addEventListener("click", e => {
      e.preventDefault();

      // Garante que o botão pai será o alvo mesmo se clicar no ícone
      const targetTab = e.currentTarget;

      // Remove 'active' de todos os botões e conteúdos
      tabs.forEach(t => t.classList.remove("active"));
      panes.forEach(p => p.classList.remove("active"));

      // Ativa a aba clicada
      targetTab.classList.add("active");

      const targetPane = document.getElementById(targetTab.dataset.tab);
      if (targetPane) {
        targetPane.classList.add("active");
      } else {
        console.warn("⚠️ Conteúdo da aba não encontrado:", targetTab.dataset.tab);
      }
    });
  });
});



  // redireciona para a lista, se quiser:
  //window.location.href = 'registered.html';


