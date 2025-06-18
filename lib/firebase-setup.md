# Configuração do Firebase Authentication

Para habilitar a autenticação por email no Firebase Console:

## 1. Acesse o Firebase Console
- Vá para https://console.firebase.google.com
- Selecione seu projeto "metanoiaprojetov2"

## 2. Configure Authentication
- No menu lateral, clique em "Authentication"
- Vá para a aba "Sign-in method"
- Habilite os seguintes provedores:
  - ✅ **Email/Password** (já deve estar habilitado)
  - ✅ **Google** (já deve estar habilitado)

## 3. Configurações de Segurança (Opcional)
- Na aba "Settings", você pode configurar:
  - Domínios autorizados
  - Modelos de email personalizados
  - Configurações de senha

## 4. Regras do Firestore
Certifique-se de que suas regras do Firestore permitem leitura/escrita para usuários autenticados:

\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir leitura pública para conteúdos
    match /palestras/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /cursos/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /conteudos-jovens/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /conteudos-familias/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Contatos podem ser criados por qualquer um, mas só lidos por admins
    match /contatos/{document} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
\`\`\`

## 5. Testando a Autenticação
- Acesse `/admin` no seu site
- Teste o login com Google
- Teste o cadastro com email
- Teste o login com email
- Teste a recuperação de senha
