---
layout: 'layouts/base.njk'
github: https://github.com/cds-snc/gcds-components/tree/main/packages/web/src/components/gcds-notice
figma: https://www.figma.com/design/o4SguSZdar2CCFzSkWNrmB/Syst%C3%A8me-de-design-GC?node-id=2002-8&node-type=canvas&t=Noeefrm7sr1qAV8J-0
permalink: false
tags: ['noticeFR', 'header']
---

# Avis <br>`<gcds-notice>`

_Autres noms : Alerte contextuelle._

L’avis est un message court et bien visible qui fait partie du contenu de la page.

{% docLinks locale stage figma github %}
{% enddocLinks %}

{% componentPreview "Aperçu du composant de Avis" %}
<gcds-notice
  type="success"
  notice-title="Titre de l'avis succès"
  notice-title-tag="h2"
>
  <gcds-text margin-bottom="0">Il s'agit d'un message de succès.</gcds-text>
</gcds-notice>
{% endcomponentPreview %}
