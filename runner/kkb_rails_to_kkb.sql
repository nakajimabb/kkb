-- users
insert into kkb_development.users(id, email, encrypted_password, code, first_name, last_name, first_kana, last_kana, sex, birthday) select id, email, encrypted_password, code, name2, name1, kana2, kana1, sex, birthday from kkb_rails.users;

-- groups
insert into kkb_development.groups(id, code, name, group_type) select id, case when code is null or code = '' then id + 9999 else code end, name, 1 from kkb_rails.groups;

-- group_users
insert into kkb_development.group_users(id, group_id, user_id, member_type) select id, group_id, user_id, 1 from kkb_rails.group_users group by group_id, user_id;

-- kkb_categories
insert into kkb_development.kkb_categories(id, code, name, parent_id, rank, created_by_id) select id, code, name, parent_id, rank, user_id from kkb_rails.kkb_categories where kkb_rails.kkb_categories.parent_id is null;
insert into kkb_development.kkb_categories(id, code, name, parent_id, rank, created_by_id) select id, code, name, parent_id, rank, user_id from kkb_rails.kkb_categories where kkb_rails.kkb_categories.parent_id is not null;

-- kkbs
insert into kkb_development.kkbs(id, title, tmp_content, status, user_id, group_id, openness, kkb_category_id, created_by_id) select id, title, comment, status, user_id, group_id, openness, kkb_category_id, case when owner_id is null then user_id else owner_id end from kkb_rails.kkbs where kkb_rails.kkbs.parent_id is null and kkb_rails.kkbs.kkb_category_id is not null;

-- Kkb.all.each do |kkb|
--     kkb.update(content: ApplicationController.helpers.simple_format(kkb.content))
-- end    

-- kkb_member_users
insert into kkb_development.kkb_member_users(id, kkb_id, user_id, member_type) select km.id, km.kkb_id, km.user_id, member_type from kkb_rails.kkb_members km join kkb_rails.kkbs k on k.id = km.kkb_id where k.parent_id is null and k.kkb_category_id is not null group by kkb_id, user_id;

-- kkb_member_groups
insert into kkb_development.kkb_member_groups(id, kkb_id, group_id, member_type) select kg.id, kg.kkb_id, kg.group_id, member_type from kkb_rails.kkb_groups kg join kkb_rails.kkbs k on k.id = kg.kkb_id where k.parent_id is null and k.kkb_category_id is not null group by kkb_id, group_id;

