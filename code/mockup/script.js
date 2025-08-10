$(function () {
  $('.add-row').on('click', function () {
    const target = $($(this).data('target'));
    const last = target.find('tr.item-row:last');
    const clone = last.clone();
    clone.find('input').val('');
    target.find('tbody').append(clone);
  });
});

