/** Local download only; enquiry delivery must be configured before launch. */
export function downloadProjectBrief(data: FormData) {
  const content = [
    'UIC — Project enquiry',
    '',
    `Name: ${data.get('name') ?? ''}`,
    `Email: ${data.get('email') ?? ''}`,
    `Interested in: ${data.get('service') ?? ''}`,
    '',
    'Project overview:',
    String(data.get('message') ?? ''),
    '',
  ].join('\n');
  const url = URL.createObjectURL(new Blob([content], { type: 'text/plain;charset=utf-8' }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'UIC-project-brief.txt';
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
