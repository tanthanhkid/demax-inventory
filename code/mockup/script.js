$(function () {
  $('.add-row').on('click', function () {
    const target = $($(this).data('target'));
    const last = target.find('tr.item-row:last');
    const clone = last.clone();
    // Clear inputs and selects in the cloned row
    clone.find('input, select, textarea').val('');
    // Remove text from cells without form controls
    clone
      .find('td')
      .filter(function () {
        return $(this).find('input, select, textarea').length === 0;
      })
      .text('');
    target.find('tbody').append(clone);
  });
});

